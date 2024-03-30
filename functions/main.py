# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn, https_fn, options, logger
import json
# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore
from src.tetris import Tetris

app = initialize_app()

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins="*",
        cors_methods=["get", "post"],
    )
)

def get_next_action(req: https_fn.Request) -> https_fn.Response:
    import torch
    import json
    data = req.get_json()
    nextTetrominoQueueAI = data['dataToSend']['nextTetrominoQueueAI']
    gameBoard = data['dataToSend']['gameBoard']
    print('receive',nextTetrominoQueueAI)
    nextTetrominoQueueAICopy = nextTetrominoQueueAI[:]

    if torch.cuda.is_available():
        torch.cuda.manual_seed(123)
    else:
        torch.manual_seed(123)
    if torch.cuda.is_available():
        model = torch.load("model")
    else:
        model = torch.load("model", map_location=lambda storage, loc: storage)
    model.eval()
    env = Tetris(nextPieceQueue=nextTetrominoQueueAICopy, gameBoard=gameBoard)
    # env.reset()
    print('copy:',nextTetrominoQueueAICopy)

    cnt = 0
    actions = []
    while cnt < len(nextTetrominoQueueAI):
        next_steps = env.get_next_states()
        next_actions, next_states = zip(*next_steps.items())
        next_states = torch.stack(next_states)
        if torch.cuda.is_available():
            next_states = next_states.cuda()
        predictions = model(next_states)[:, 0]
        index = torch.argmax(predictions).item()
        action = next_actions[index]
        print(action)
        actions.append(action)
        _, done = env.step(action)
        print('cnt',cnt)
        cnt += 1

        if done:
            logger.info("Game over")
            break

    print((actions))
    # print(json.dumps(actions))


    headers = {
        "Content-Type": "application/json",
    }
    return https_fn.Response(json.dumps(actions), headers=headers, status=200)
