import { Injectable } from '@angular/core';

@Injectable()
export class SlackService {

  constructor() { }

  url = 'https://hooks.slack.com/services/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';

  public slackTopicRequested(data): void {

    console.log(data)
    const slackText = "<!channel> " + data.noviceName + " needs help with `" + data.title + "`. Go to <http://localhost:4200/|dojo> to pair."

    fetch(this.url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
      body: JSON.stringify({text: slackText})
    })
      .then(response => console.log)
      .catch(error => console.error);
  };  

}
