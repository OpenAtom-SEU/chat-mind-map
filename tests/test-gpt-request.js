const gptRequest = require('../src/modules/gpt-request');

const gptReq = new gptRequest();

gptReq.genMindMapFromTopic('Web应用程序的构建流程').then(res => {
  // save to file
  const fs = require('fs');
  fs.writeFile('test.json', res, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });
});
