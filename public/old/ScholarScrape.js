var request = require('request');
var cheerio = require('cheerio');

request('http://www.electronicinfo.ca/scholarships/?search=&group=a-g', function (firstError, firstResponse, firstHtml) {
    if (firstError) {
        console.log("Sorry, Error Scraping The Info");
    } else {
        const $ = cheerio.load(firstHtml);
        const firstScholar = $('.result.result-scholarship');
        let firstInfo = [];
        let firstData = Array.from(firstScholar);
        for (const element of firstData) {
            firstInfo.push({
                heading: $(element).find('.result-heading').text(),
                subheading: $(element).find('.result-subheading').text(),
                attributes: $(element).find('.result-attributes').text(),
                actionHead: $(element).find('.actions-heading').text(),
                actionText: $(element).find('.actions-text').text()
            });
        }
        request('http://www.electronicinfo.ca/scholarships/?search=&group=h-l', function (secondError, secondResponse, secondHtml) {
            if (secondError) {
                console.log("Sorry, Error Scraping The Info");
            } else {
                const $ = cheerio.load(secondHtml);
                const secondScholar = $('.result.result-scholarship');
                let secondInfo = [];
                let secondData = Array.from(secondScholar);
                for (const element of secondData) {
                    secondInfo.push({
                        heading: $(element).find('.result-heading').text(),
                        subheading: $(element).find('.result-subheading').text(),
                        attributes: $(element).find('.result-attributes').text(),
                        actionHead: $(element).find('.actions-heading').text(),
                        actionText: $(element).find('.actions-text').text()
                    });
                }
                request('http://www.electronicinfo.ca/scholarships/?search=&group=m-o', function (thirdError, thirdResponse, thirdHtml) {
                    if (thirdError) {
                        console.log("Sorry, Error Scraping The Info");
                    } else {
                        const $ = cheerio.load(thirdHtml);
                        const thirdScholar = $('.result.result-scholarship');
                        let thirdInfo = [];
                        let thirdData = Array.from(thirdScholar);
                        for (const element of thirdData) {
                            thirdInfo.push({
                                heading: $(element).find('.result-heading').text(),
                                subheading: $(element).find('.result-subheading').text(),
                                attributes: $(element).find('.result-attributes').text(),
                                actionHead: $(element).find('.actions-heading').text(),
                                actionText: $(element).find('.actions-text').text()
                            });
                        }
                        request('http://www.electronicinfo.ca/scholarships/?search=&group=p-t', function (fourthError, fourthResponse, fourthHtml) {
                            if (fourthError) {
                                console.log("Sorry, Error Scraping The Info");
                            } else {
                                const $ = cheerio.load(fourthHtml);
                                const fourthScholar = $('.result.result-scholarship');
                                let fourthInfo = [];
                                let fourthData = Array.from(fourthScholar);
                                for (const element of fourthData) {
                                    fourthInfo.push({
                                        heading: $(element).find('.result-heading').text(),
                                        subheading: $(element).find('.result-subheading').text(),
                                        attributes: $(element).find('.result-attributes').text(),
                                        actionHead: $(element).find('.actions-heading').text(),
                                        actionText: $(element).find('.actions-text').text()
                                    });
                                }
                                request('http://www.electronicinfo.ca/scholarships/?search=&group=u-w', function (fifthError, fifthResponse, fifthHtml) {
                                    if (fifthError) {
                                        console.log("Sorry, Error Scraping The Info");
                                    } else {
                                        const $ = cheerio.load(fifthHtml);
                                        const fifthScholar = $('.result.result-scholarship');
                                        let fifthInfo = [];
                                        let fifthData = Array.from(fifthScholar);
                                        for (const element of fifthData) {
                                            fifthInfo.push({
                                                heading: $(element).find('.result-heading').text(),
                                                subheading: $(element).find('.result-subheading').text(),
                                                attributes: $(element).find('.result-attributes').text(),
                                                actionHead: $(element).find('.actions-heading').text(),
                                                actionText: $(element).find('.actions-text').text()
                                            });
                                        }
                                        request('http://www.electronicinfo.ca/scholarships/?search=&group=x-z', function (sixthError, sixthResponse, sixthHtml) {
                                            if (sixthError) {
                                                console.log("Sorry, Error Scraping The Info");
                                            } else {
                                                const $ = cheerio.load(sixthHtml);
                                                const sixthScholar = $('.result.result-scholarship');
                                                let sixthInfo = [];
                                                let sixthData = Array.from(sixthScholar);
                                                for (const element of sixthData) {
                                                    sixthInfo.push({
                                                        heading: $(element).find('.result-heading').text(),
                                                        subheading: $(element).find('.result-subheading').text(),
                                                        attributes: $(element).find('.result-attributes').text(),
                                                        actionHead: $(element).find('.actions-heading').text(),
                                                        actionText: $(element).find('.actions-text').text()
                                                    });
                                                }
                                                var finalDisplay = firstInfo.concat(secondInfo, thirdInfo, fourthInfo, fifthInfo, sixthInfo);
                                                console.log(finalDisplay);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});
