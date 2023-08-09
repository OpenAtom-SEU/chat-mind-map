const {Configuration, OpenAIApi} = require('openai');

/**
 * GPTRequest class
 * @class
 * @param {string} model - Specifies the conversational model to use.
 * @param {number} temperature - Controls creativity, between 0 (focused) and 2 (random).
 * @param {number} maxTokensPerReq - Both input and output texts are taken into account.
 */
class GPTRequest {
  constructor(model = 'gpt-3.5-turbo', temperature = 0,
              maxTokensPerReq = 1024) {
    const apiKey = process.env.OPENAI_API_KEY;
    const config = new Configuration({apiKey: apiKey});
    this.openai = new OpenAIApi(config);
    this.model = model;
    this.temperature = temperature;
    this.maxTokens = maxTokensPerReq;
  }

  async genMindMapFromTopic(topic) {
    // TODO: more concise and efficient template?
    const responseTemplate = '{"root":{"data":{"text":"CoreTopic"},"children":[{"data":{"text":"MainBranch1"},"children":[{"data":{"text":"SubBranch1-1"}}]}]}}';

    const messages = [
      {
        'role': 'system',
        'content': `[Role]: You are a researcher in the field of [${topic}] and skilled in creating mind maps. ` +
            '[Mission]: Create a mind map based on the core topic provided by the user' +
            '[Requirements]:' +
            `1. Summarize in the following format: ${responseTemplate}` +
            '2. Summarize in [the same language as the core topic]. ' +
            '3. Output of characters other than JSON is prohibited. ',
      }, {
        'role': 'user', 'content': `Core Topic: ${topic}.`,
      }];

    const chatComp = await this.openai.createChatCompletion({
      model: this.model,
      messages: messages,
      // functions:  // TODO: useful, refer to https://platform.openai.com/docs/guides/gpt/function-calling
      temperature: this.temperature,
      max_tokens: this.maxTokens,
    });

    console.log('[USAGE]: ' + chatComp.data.usage);
    console.log('[MESSAGE]: ' + chatComp.data.choices[0].message.content);

    return chatComp.data.choices[0].message.content;

  }
}

module.exports = GPTRequest;
