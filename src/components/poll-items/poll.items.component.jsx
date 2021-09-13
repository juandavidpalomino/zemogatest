import React, { useState } from 'react'
import PollCard from '../poll-card/poll.card.component'
import './poll.items.styles.scss'
import Select from 'react-select'

// import update from 'immutability-helper';

export default function PollItems({ items, updateVote, reset }) {

    const [layout, setLayout] = useState({ value: 'list', label: 'List View' });

    const options = [
        { value: 'list', label: 'List View' },
        { value: 'grid', label: 'Grid View' }
    ]

    function handleChange(value) {
        setLayout(value)
    }

    return (
        <div className="poll-content">
            <div className="poll-header">
                <h2>Previous Rulings</h2>
                <div className="buttons-right">
                    <button onClick={reset} className="resetButton">Reset</button>
                    <div className="layout-selector" style={{ width: '130px', zIndex: 1000 }}>
                        <Select
                            options={options}
                            value={layout}
                            onChange={option => handleChange(option)}
                            defaultValue={{ value: 'list', label: 'List View' }}
                        />
                    </div>
                </div>

            </div>
            <div className="poll-main-wrapper">
                <div className={"poll-wrapper " + layout.value}>
                    {items.map(item => (
                        <PollCard {...item} updateVote={updateVote} key={item.id} />
                    ))}

                </div>
            </div>
        </div>
    )
}
