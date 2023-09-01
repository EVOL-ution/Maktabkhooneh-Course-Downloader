# Maktabkhooneh-Course-Downloader
This is a Tampermonkey/Greasemonkey userscript to automate downloading course videos from [Maktabkhooneh](https://maktabkhooneh.org/).

## Features

- Adds a "Download" button to course pages
- Extracts download links for all video units
- Opens a new tab with direct links to download all videos

## Usage

1. Install the [Tampermonkey](https://www.tampermonkey.net/) (Chrome) or [Greasemonkey](https://www.greasespot.net/) (Firefox) extension.
2. Click here to [install the script](https://github.com/EVOL-ution/Maktabkhooneh-Course-Downloader/blob/main/Maktabkhooneh_Course_Downloader.js).
3. Go to any course page on Maktabkhooneh that you have purchased and own access to.
4. Click the `دانلود` (Download) button to extract download links.
5. The script will automatically collect and display the download links for each course unit in a new page.

## Note

You should only use this on courses that you have legitimately purchased and own access to. Downloading courses you don't own may violate Maktabkhooneh's terms of service.

## How it works

The script adds a "Download" button to the course pages. When clicked, it:

- Extracts all unit links from the current page
- Sends GET requests to those links to fetch the unit pages
- Parses the response HTML to extract the video download links
- Opens a new tab with the download links listed
So with one click you can get direct download links for the entire course

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/EVOL-ution/Maktabkhooneh-Course-Downloader/blob/main/LICENSE) file for details.


## Author

This userscript was created by EVOL-ution.
