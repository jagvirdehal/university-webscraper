var request = require('request');
var cheerio = require('cheerio');

request('http://www.electronicinfo.ca/programs/search/?search=&group=a', function(firstError, firstResponse, firstHtml) {
  if (firstError) {
    console.log("Sorry, Error Scraping The Info");
  } else {
    const $ = cheerio.load(firstHtml);
    const firstProgram = $('.result.result-program');
    let firstInfo = [];
    let firstData = Array.from(firstProgram);
    for (const element of firstData) {
      firstInfo.push({
        heading: $(element).find('.result-heading').text(),
        subheading: $(element).find('.result-subheading').text(),
        attributes: $(element).find('.result-attributes').text(),
      });
    }
    request('http://www.electronicinfo.ca/programs/search/?search=&group=b', function(secondError, secondResponse, secondHtml) {
      if (secondError) {
        console.log("Sorry, Error Scraping The Info");
      } else {
        const $ = cheerio.load(secondHtml);
        const secondProgram = $('.result.result-program');
        let secondInfo = [];
        let secondData = Array.from(secondProgram);
        for (const element of secondData) {
          secondInfo.push({
            heading: $(element).find('.result-heading').text(),
            subheading: $(element).find('.result-subheading').text(),
            attributes: $(element).find('.result-attributes').text(),
          });
        }
        request('http://www.electronicinfo.ca/programs/search/?search=&group=c', function(thirdError, thirdResponse, thirdHtml) {
          if (thirdError) {
            console.log("Sorry, Error Scraping The Info");
          } else {
            const $ = cheerio.load(thirdHtml);
            const thirdProgram = $('.result.result-program');
            let thirdInfo = [];
            let thirdData = Array.from(thirdProgram);
            for (const element of thirdData) {
              thirdInfo.push({
                heading: $(element).find('.result-heading').text(),
                subheading: $(element).find('.result-subheading').text(),
                attributes: $(element).find('.result-attributes').text(),
              });
            }
            request('http://www.electronicinfo.ca/programs/search/?search=&group=d-e', function(fourthError, fourthResponse, fourthHtml) {
              if (fourthError) {
                console.log("Sorry, Error Scraping The Info");
              } else {
                const $ = cheerio.load(fourthHtml);
                const fourthProgram = $('.result.result-program');
                let fourthInfo = [];
                let fourthData = Array.from(fourthProgram);
                for (const element of fourthData) {
                  fourthInfo.push({
                    heading: $(element).find('.result-heading').text(),
                    subheading: $(element).find('.result-subheading').text(),
                    attributes: $(element).find('.result-attributes').text(),
                  });
                }
                request('http://www.electronicinfo.ca/programs/search/?search=&group=f-g', function(fifthError, fifthResponse, fifthHtml) {
                  if (fifthError) {
                    console.log("Sorry, Error Scraping The Info");
                  } else {
                    const $ = cheerio.load(fifthHtml);
                    const fifthProgram = $('.result.result-program');
                    let fifthInfo = [];
                    let fifthData = Array.from(fifthProgram);
                    for (const element of fifthData) {
                      fifthInfo.push({
                        heading: $(element).find('.result-heading').text(),
                        subheading: $(element).find('.result-subheading').text(),
                        attributes: $(element).find('.result-attributes').text(),
                      });
                    }
                    request('http://www.electronicinfo.ca/programs/search/?search=&group=h', function(sixthError, sixthResponse, sixthHtml) {
                      if (sixthError) {
                        console.log("Sorry, Error Scraping The Info");
                      } else {
                        const $ = cheerio.load(sixthHtml);
                        const sixthProgram = $('.result.result-program');
                        let sixthInfo = [];
                        let sixthData = Array.from(sixthProgram);
                        for (const element of sixthData) {
                          sixthInfo.push({
                            heading: $(element).find('.result-heading').text(),
                            subheading: $(element).find('.result-subheading').text(),
                            attributes: $(element).find('.result-attributes').text(),
                          });
                        }
                        request('http://www.electronicinfo.ca/programs/search/?search=&group=i', function(seventhError, seventhResponse, seventhHtml) {
                          if (seventhError) {
                            console.log("Sorry, Error Scraping The Info");
                          } else {
                            const $ = cheerio.load(seventhHtml);
                            const seventhProgram = $('.result.result-program');
                            let seventhInfo = [];
                            let seventhData = Array.from(seventhProgram);
                            for (const element of seventhData) {
                              seventhInfo.push({
                                heading: $(element).find('.result-heading').text(),
                                subheading: $(element).find('.result-subheading').text(),
                                attributes: $(element).find('.result-attributes').text(),
                              });
                            }
                            request('http://www.electronicinfo.ca/programs/search/?search=&group=j-l', function(eigthError, eigthResponse, eigthHtml) {
                              if (eigthError) {
                                console.log("Sorry, Error Scraping The Info");
                              } else {
                                const $ = cheerio.load(eigthHtml);
                                const eigthProgram = $('.result.result-program');
                                let eigthInfo = [];
                                let eigthData = Array.from(eigthProgram);
                                for (const element of eigthData) {
                                  eigthInfo.push({
                                    heading: $(element).find('.result-heading').text(),
                                    subheading: $(element).find('.result-subheading').text(),
                                    attributes: $(element).find('.result-attributes').text(),
                                  });
                                }
                                request('http://www.electronicinfo.ca/programs/search/?search=&group=m', function(ninthError, ninthResponse, ninthHtml) {
                                  if (ninthError) {
                                    console.log("Sorry, Error Scraping The Info");
                                  } else {
                                    const $ = cheerio.load(ninthHtml);
                                    const ninthProgram = $('.result.result-program');
                                    let ninthInfo = [];
                                    let ninthData = Array.from(ninthProgram);
                                    for (const element of ninthData) {
                                      ninthInfo.push({
                                        heading: $(element).find('.result-heading').text(),
                                        subheading: $(element).find('.result-subheading').text(),
                                        attributes: $(element).find('.result-attributes').text(),
                                      });
                                    }
                                    request('http://www.electronicinfo.ca/programs/search/?search=&group=n-p', function(tenthError, tenthResponse, tenthHtml) {
                                      if (tenthError) {
                                        console.log("Sorry, Error Scraping The Info");
                                      } else {
                                        const $ = cheerio.load(tenthHtml);
                                        const tenthProgram = $('.result.result-program');
                                        let tenthInfo = [];
                                        let tenthData = Array.from(tenthProgram);
                                        for (const element of tenthData) {
                                          tenthInfo.push({
                                            heading: $(element).find('.result-heading').text(),
                                            subheading: $(element).find('.result-subheading').text(),
                                            attributes: $(element).find('.result-attributes').text(),
                                          });
                                        }
                                        request('http://www.electronicinfo.ca/programs/search/?search=&group=q-s', function(eleventhError, eleventhResponse, eleventhHtml) {
                                          if (eleventhError) {
                                            console.log("Sorry, Error Scraping The Info");
                                          } else {
                                            const $ = cheerio.load(eleventhHtml);
                                            const eleventhProgram = $('.result.result-program');
                                            let eleventhInfo = [];
                                            let eleventhData = Array.from(eleventhProgram);
                                            for (const element of eleventhData) {
                                              eleventhInfo.push({
                                                heading: $(element).find('.result-heading').text(),
                                                subheading: $(element).find('.result-subheading').text(),
                                                attributes: $(element).find('.result-attributes').text(),
                                              });
                                            }
                                            request('http://www.electronicinfo.ca/programs/search/?search=&group=t-z', function(twelfthError, twelfthResponse, twelfthHtml) {
                                              if (twelfthError) {
                                                console.log("Sorry, Error Scraping The Info");
                                              } else {
                                                const $ = cheerio.load(twelfthHtml);
                                                const twelfthProgram = $('.result.result-program');
                                                let twelfthInfo = [];
                                                let twelfthData = Array.from(twelfthProgram);
                                                for (const element of twelfthData) {
                                                  twelfthInfo.push({
                                                    heading: $(element).find('.result-heading').text(),
                                                    subheading: $(element).find('.result-subheading').text(),
                                                    attributes: $(element).find('.result-attributes').text(),
                                                  });
                                                }
                                                var finalDisplay = firstInfo.concat(secondInfo, thirdInfo, fourthInfo, fifthInfo, sixthInfo, seventhInfo, eigthInfo, ninthInfo, tenthInfo, eleventhInfo, twelfthInfo);
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
