import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

export class GroupChatSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    // You could also lift `messages` into state if you intend to modify it.
    this.messages = [
      {
        id: '1',
        sender: 'Amina',
        text: 'I think we should consider the beachfront villas in Diani!',
        time: '10:45 AM',
      },
      {
        id: '2',
        sender: 'Juma',
        text: "Noted, I'll look into the prices for that.",
        time: '10:48 AM',
      },
      {
        id: '3',
        sender: 'Karanja',
        text: 'I prefer something closer to restaurants and nightlife.',
        time: '10:52 AM',
      },
      {
        id: '4',
        sender: 'Mwangi',
        text: "Let's vote on it. I'll add some options to the selections.",
        time: '11:05 AM',
      },
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSend() {
    const { message } = this.state;
    if (message.trim()) {
      // In a real app, we would send this to an API
      console.log('Sending message:', message);
      this.setState({ message: '' });
    }
  }

  render() {
    const { message } = this.state;

    return (
      <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-96">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <MessageSquare size={18} className="mr-2" />
            <h2 className="font-medium">Group Chat</h2>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {this.messages.map((msg) => (
              <div key={msg.id} className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-medium">{msg.sender}:</span>
                  <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                </div>
                <p className="text-sm mt-1">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 p-3">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={this.handleChange}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              className="bg-black text-white p-2 rounded-r-md hover:bg-gray-800"
              onClick={this.handleSend}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
