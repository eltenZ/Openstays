import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export class SelectionsCard extends React.Component {
  constructor(props) {
    super(props);
    // You could lift this into state if you intend to update votes or add options
    this.selections = [
      {
        id: '1',
        title: 'Safari Lodge, Kilifi',
        description: 'Luxury accommodation with ocean views',
        image:
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        votes: {
          up: 2,
          down: 1,
        },
      },
      {
        id: '2',
        title: 'Beachfront Villa, Diani',
        description: 'Private access to the beach with 4 bedrooms',
        image:
          'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        votes: {
          up: 3,
          down: 0,
        },
      },
    ];
  }

  render() {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Selections & Voting</h2>
            <button className="text-sm text-gray-600 hover:text-black">
              + Add Option
            </button>
          </div>
          <div className="space-y-4">
            {this.selections.map((selection) => (
              <div
                key={selection.id}
                className="flex border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={selection.image}
                    alt={selection.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 flex justify-between">
                  <div>
                    <h3 className="font-medium">{selection.title}</h3>
                    <p className="text-sm text-gray-500">
                      {selection.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 p-1.5 rounded hover:bg-gray-100">
                      <ThumbsUp size={16} />
                      <span className="text-sm">{selection.votes.up}</span>
                    </button>
                    <button className="flex items-center space-x-1 p-1.5 rounded hover:bg-gray-100">
                      <ThumbsDown size={16} />
                      <span className="text-sm">{selection.votes.down}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
