<div align="center">
    <a href="https://resume-factory.vercel.app">
        <img src="https://raw.githubusercontent.com/zyrrus/resume-factory/main/public/favicon.svg" alt="Resume Factory logo" width="100" height="100" />
    </a>
</div>

# Resume Factory

This is a tool that allows you to piece together a tailored resume by selecting your most relevant career achievements, skills, projects, and education from your CV, and then assemble those parts into a more refined resume.

[resume-factory.vercel.app](https://resume-factory.vercel.app)

<div align="center">
  <svg height="30" width="40%">
    <line x1="0" y1="15" x2="100%" y2="15" style="stroke:#5b4d52;stroke-width:1.5" />
    <circle cx="50%" cy="15" r="3" fill="#5b4d52" />
  </svg>
</div>

## Setting up the dev environment

1. Install WSL and Docker

   - [WSL installation](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command)
   - [Docker installation](https://docs.docker.com/desktop/install/windows-install/)

2. Clone the repo with `git clone https://github.com/zyrrus/resume-factory.git`
3. Run `npm i` in the project root
4. Copy the contents of `.env.example` into a new file called `.env`
5. Follow the instructions in the `.env` file to get a value for `NEXTAUTH_SECRET`
6. Start database (not always necessary)
   1. Open Docker Desktop to start running it
   2. Start `wsl` and run `./start-database.sh` in a terminal
   3. Say `y` when asked about generating a password
7. Start the project by running `npm run dev` in a separate terminal
