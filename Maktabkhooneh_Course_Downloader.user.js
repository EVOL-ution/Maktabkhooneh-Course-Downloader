// ==UserScript==
// @name         Maktabkhooneh Course Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automate the process of grabbing download links from Maktabkhooneh course pages
// @author       EVOL-ution
// @match        https://maktabkhooneh.org/course/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Function to convert relative href links to absolute URLs
    function toAbsoluteUrl(relativeUrl) {
        return "https://maktabkhooneh.org" + relativeUrl;
    }

    // Function to grab href links and send GET requests
    function grabAndSendLinks() {
        // Find all elements with the specified class name
        var sectionElement = document.querySelector('section.base-chapter__section');
        var hrefLinks = [];

        if (sectionElement) {
            // Find all anchor elements within the section
            var anchorElements = sectionElement.querySelectorAll('a');

            // Iterate through the anchor elements and collect their href links
            anchorElements.forEach(function (element) {
                var href = element.getAttribute('href');
                if (href) {
                    var absoluteUrl = toAbsoluteUrl(href);
                    hrefLinks.push(absoluteUrl);
                }
            });
        }

        // Send GET requests for all href links
        var downloadLinks = [];

        Promise.all(
            hrefLinks.map(function(href) {
                return new Promise(function(resolve, reject) {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: href,
                        onload: function(response) {
                            var downloadLink = extractDownloadLink(response.responseText);
                            if (downloadLink) {
                                downloadLinks.push(downloadLink);
                            }
                            resolve();
                        },
                        onerror: function(error) {
                            reject(error);
                        }
                    });
                });
            })
        ).then(function() {
            displayDownloadLinks(downloadLinks);
        });
    }

    // Function to extract download link from response HTML
    function extractDownloadLink(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var downloadDiv = doc.querySelector('div.unit-content--download');
        if (downloadDiv) {
            var downloadLink = downloadDiv.querySelector('a.button--round');
            if (downloadLink) {
                return downloadLink.getAttribute('href');
            }
        }
        return null;
    }

    // Function to display download links in a new page
    function displayDownloadLinks(downloadLinks) {
        var newPage = window.open('', '_blank');
        newPage.document.write('<html><head><title>Download Links</title></head><body><h1>Download Links</h1><ul>');

        downloadLinks.forEach(function(link) {
            newPage.document.write('<li><a href="' + link + '">' + link + '</a></li>');
        });

        newPage.document.write('</ul></body></html>');
        newPage.document.close();
    }

    // Function to add the download button
    function addDownloadButton() {
        var buttonDiv = document.createElement('div');
        buttonDiv.classList.add('ml-20', 'cursor-pointer', 'md:text-xl');

        var downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.classList.add('button--full');
        downloadButton.innerText = 'دانلود'; // Change button text here

        downloadButton.addEventListener('click', function() {
            grabAndSendLinks();
        });

        buttonDiv.appendChild(downloadButton);

        var navbar = document.querySelector('.course-page__navbar-items');

        // Insert the button as the first child
        navbar.insertBefore(buttonDiv, navbar.firstChild);
    }

    // Check if the URL matches the course page pattern
    if (window.location.pathname.startsWith('/course/')) {
        // Wait for the page to be fully loaded using window.onload
        window.onload = function() {
            addDownloadButton();
        };
    }
})();
