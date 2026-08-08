# Aura — Personal Life Dashboard & Activity Tracker

Aura is a premium, client-side personal dashboard web application that lets you track daily status, activities, habits, and view visual monthly reports. 

Because it uses **Local-First Architecture** (saving data inside your browser's local storage), it requires no backend server. This means:
* **100% Free Forever**: You don't have to pay for hosting, database storage, or subscriptions.
* **Complete Privacy**: All tracked logs remain on your computer; no data is ever uploaded to a remote server.
* **Global Access**: When you share your site link, everyone can use it immediately. Their logs will be stored in their own browser and won't affect yours.

---

## 🚀 How to Run and View the Website Locally

You can run this project on your computer without installing any programming tools or compilers.

1. **Locate the Folder**: Open your Mac Finder and navigate to the directory:
   `/Users/sanidi2005/.gemini/antigravity/scratch/aura-life-dashboard/`
2. **Open in Browser**: Double-click `index.html`. It will open instantly in Chrome, Safari, or your default browser.
3. **Edit Code**: Open **VS Code** (Visual Studio Code), click *File > Open Folder*, and select the `/Users/sanidi2005/.gemini/antigravity/scratch/aura-life-dashboard/` folder.
   * Modify layout structure inside `index.html`.
   * Edit typography, colors, and neon glows inside `styles.css`.
   * Adjust default behaviors or add motivational quotes inside `app.js`.

---

## 🌐 How to Host on GitHub Pages (Step-by-Step Guide)

GitHub Pages allows you to host static HTML/CSS/JS websites for **free forever** with a custom URL.

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click the green **New** button (or **Create Repository**) in the top left dashboard.
3. Name your repository: `aura-life-dashboard`.
4. Set visibility to **Public** (required for free GitHub Pages).
5. Leave all other options (README, gitignore, License) unchecked.
6. Click **Create repository**.

### Step 2: Upload Your Files
1. On the repository page, click the link that says **"uploading an existing file"** near the top.
2. Drag and drop all files from your local folder (`/Users/sanidi2005/.gemini/antigravity/scratch/aura-life-dashboard/`) into the upload box:
   * `index.html`
   * `styles.css`
   * `app.js`
   * `README.md`
3. Wait for the upload to complete.
4. Click the green **Commit changes** button at the bottom of the upload page.

### Step 3: Turn on GitHub Pages
1. Go to your repository's **Settings** tab (the gear icon on the top navigation bar).
2. On the left sidebar menu, scroll down to the **Code and automation** section and click **Pages**.
3. Under **Build and deployment > Branch**:
   * Change the dropdown from **None** to **main**.
   * Leave the folder dropdown as `/ (root)`.
   * Click the **Save** button.

### Step 4: Access Your Link!
1. Wait about 30 to 60 seconds.
2. Refresh the **Pages** settings screen.
3. A banner will appear at the top showing your active website link! It will look like this:
   `https://your-username.github.io/aura-life-dashboard/`
4. Click it to open your live website! You can now share this URL with anyone.

---

## 🛠️ Data Portability & Settings
* **Resetting Data**: If you want to clear your records, go to the **Settings** tab on the website and click **Delete All Data**.
* **Backups**: Since data is saved in your browser, it can be deleted if you wipe your browser cache. Make sure to click **Export Aura Data (JSON Backup)** under Settings periodically. You can re-import this backup on any device or browser to restore your history.
