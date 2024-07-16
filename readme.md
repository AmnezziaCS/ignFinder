# 🗺️ ignFinder

Welcome to **ignFinder**! This project is a simple script that scans accounts to find good claimable usernames. 🌟

## Features ✨

- **Fast**: Quickly scans through usernames.
- **Configurable**: Easy to set up and customize.
- **Efficient**: Finds the best usernames for you.

## Setup 🛠️

Follow these steps to get started:

1. **Clone the repository**:

    ```sh
    git clone https://github.com/amnezziaa/ignFinder.git
    cd ignFinder
    ```

2. **Install dependencies**:

    ```sh
    npm ci
    ```

3. **Create a `.env` file**:

    Copy the `.env.example` to `.env` and configure it:

    ```sh
    cp .env.example .env
    ```

4. **Run the script**:

    ```sh
    npm run dev
    ```

## Configuration ⚙️

The configuration is done via the `.env` file. Here are the available options:

- `ROOT_URL`: The base URL for the service (default: `https://github.com/`).
- `MIN_LENGTH`: The minimum length of the usernames to check (default: `3`).

## Usage 📖

The script reads usernames from the `dictionaries/usernames.txt` file and checks their availability. The results are saved in:

- `dictionaries/usernames-checked.txt`: Usernames that have been checked.
- `dictionaries/usernames-claimable.txt`: Usernames that are claimable.
