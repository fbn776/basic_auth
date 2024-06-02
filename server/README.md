# Server Code

The backend code.

## Tech stack

- NodeJs
- Express
- MongoDB
- TypeScript
- JWT

## Usage

- Install all the dependencies
	```bash
	npm install
	# OR
	bun install
	# OR
	yarn install
	# OR
	pnpm install
	# etc..
	```
	Use any package manager.

- Rename `.env.example` to `.env`; And fill the env variable with necessary values.

- Run the backend code
	```bash
	# Uses `tsx` to execute, takes far longer to run
	npm run dev:node
	```

	For faster dev times use `bun`
	```bash
	# Uses `bun` runtime, which is way faster than nodejs
	# But may not be 100% compatible with node
	bun run dev:bun
	```

- The server should be up and running at
	[http://localhost:5000](http://localhost:5000)
	> If `PORT` in env is 5000