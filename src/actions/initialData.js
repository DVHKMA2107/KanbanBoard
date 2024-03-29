export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'To do column',
          cardOrder: [
            'card-1',
            'card-2',
            'card-3',
            'card-4',
            'card-5',
            'card-6',
            'card-7'
          ],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 1',
              cover:
                'https://upload.wikimedia.org/wikipedia/commons/9/99/Keyboard_Warrior_%28Unsplash%29.jpg'
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 2',
              cover: null
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 3',
              cover: null
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 4',
              cover: null
            },
            {
              id: 'card-5',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 5',
              cover: null
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 6',
              cover: null
            },
            {
              id: 'card-7',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 7',
              cover: null
            }
          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'Inprogress column',
          cardOrder: ['card-8', 'card-9', 'card-10'],
          cards: [
            {
              id: 'card-8',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 8',
              cover: null
            },
            {
              id: 'card-9',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 9',
              cover: null
            },
            {
              id: 'card-10',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 10',
              cover: null
            }
          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Done column',
          cardOrder: ['card-11', 'card-12', 'card-13'],
          cards: [
            {
              id: 'card-11',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 11',
              cover: null
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 12',
              cover: null
            },
            {
              id: 'card-13',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 13',
              cover: null
            }
          ]
        },
        {
          id: 'column-4',
          boardId: 'board-1',
          title: 'Done column',
          cardOrder: ['card-14', 'card-15', 'card-16'],
          cards: [
            {
              id: 'card-14',
              boardId: 'board-1',
              columnId: 'column-4',
              title: 'Title of card 14',
              cover: null
            },
            {
              id: 'card-15',
              boardId: 'board-1',
              columnId: 'column-4',
              title: 'Title of card 15',
              cover: null
            },
            {
              id: 'card-16',
              boardId: 'board-1',
              columnId: 'column-4',
              title: 'Title of card 16',
              cover: null
            }
          ]
        },
        {
          id: 'column-5',
          boardId: 'board-1',
          title: 'Done column',
          cardOrder: ['card-17', 'card-18', 'card-19'],
          cards: [
            {
              id: 'card-17',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 17',
              cover: null
            },
            {
              id: 'card-18',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 18',
              cover: null
            },
            {
              id: 'card-19',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 19',
              cover: null
            }
          ]
        }
      ]
    }
  ]
}
