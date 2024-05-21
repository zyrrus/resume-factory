# Resume Factory

## Setting up the dev environment

1. Install Docker and WSL

   - [Docker installation](https://docs.docker.com/desktop/install/windows-install/)
   - [WSL installation](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command)

2. Clone the repo with `git clone https://github.com/zyrrus/resume-factory.git`
3. Run `npm i` in the project root
4. Copy the contents of `.env.example` into a new file called `.env`
5. Start database (not always necessary)
   1. Open Docker Desktop to start running it
   2. Start `wsl` and run `./start-database.sh` in a terminal
6. Start the project by running `npm run dev` in a separate terminal
