import React from 'react'
import PollCard from '../poll-card/poll.card.component'
import './poll.items.styles.scss'
// import update from 'immutability-helper';

export default function PollItems({ items, updateVote }) {

    return (
        <div className="poll-wrapper grid">
            {items.map(item => (
                <PollCard {...item} updateVote={updateVote} key={item.id} />
            ))}

        </div>
    )
}
