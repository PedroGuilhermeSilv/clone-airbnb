
import os

import resend

from src.django_project.externals.celery import app


@app.task()
def send_confirmation_email():

    resend.api_key = os.getenv("RESEND_API_KEY")

    resend.Emails.send({
    "from": "onboarding@resend.dev",
    "to": "emserhdpg@gmail.com",
    "subject": "Hello!",
    "html": """
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirme seu Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bem-vindo(a)!</h1>
        <p>Obrigado por se registrar. Por favor, confirme seu email clicando no botão abaixo.</p>
        <a href="{{ confirmation_link }}" class="btn">Confirmar Email</a>
    </div>
</body>
</html>

""",
    })
