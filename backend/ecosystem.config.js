module.exports = {
    apps: [
      {
        name: "bt-API",
        script: "uvicorn",
        args: "API:app --host 0.0.0.0 --port 8001",
        interpreter: "python3",
        env: {
          PYTHONUNBUFFERED: "1",
          PYTHONPATH: "/var/www/servebiz.space/bt/bt-crm/backend",
        },
      },
    ],
  };