import React, { useState, useEffect } from 'react'
import './poll.card.styles.scss'
import thumbsup from '../../assets/img/thumbs-up.svg';
import thumbsdown from '../../assets/img/thumbs-down.svg';
import undo from '../../assets/img/undo.svg';

export default function PollCard({ id, name, description, category, picture, lastUpdated, votes, updateVote }) {

    const descLimit = 170;
    const nameLimit = 170;

    const [thisVote, setThisVote] = useState(0);
    const [voted, setVoted] = useState(false);
    const [lastVoted, setLastVoted] = useState(0);


    const eyebrow = (!voted) ?
        calcDate(new Date(), new Date(lastUpdated)) + " in " + category.charAt(0).toUpperCase() + category.slice(1)
        : "Thank you for your vote";

    const voteCTA = (!voted) ?
        "Vote Now"
        : "Vote Again";


    const positives = Number(votes.positive)
    const negatives = Number(votes.negative)

    const isPos = (positives >= negatives);

    const totalVotes = positives + negatives;
    const positiveString = `${Math.round(positives / totalVotes * 1000) / 10}%`;
    const negativeString = `${Math.round(negatives / totalVotes * 1000) / 10}%`;

    function vote() {
        if (thisVote !== 0 && !voted) {
            updateVote(id, (thisVote > 0) ? 'positive' : 'negative', 1);
            setLastVoted(thisVote);
            // setThisVote(0);
            setVoted(true);
        } else if (voted) {
            setThisVote(0);
            // updateVote(id, (lastVoted > 0) ? 'positive' : 'negative', -1);
            // setLastVoted(0);
            setVoted(false);
        }
    }

    function revert() {
        if (voted) {
            updateVote(id, (lastVoted > 0) ? 'positive' : 'negative', -1);
            setLastVoted(0);
            setThisVote(0);
            setVoted(false);
        }
    }

    function calcDate(date1, date2) {
        var diff = Math.floor(date1.getTime() - date2.getTime());
        var day = 1000 * 60 * 60 * 24;

        var minutes = Math.floor(diff / day * 24 * 60);
        var hours = Math.floor(diff / day * 24);
        var days = Math.floor(diff / day);
        var months = Math.floor(days / 31);
        var years = Math.floor(months / 12);

        var message = "";
        if (years >= 1)
            message = `${years} year${((years > 1) ? 's' : '')} ago`;
        else if (months >= 1)
            message = `${months} month${((months > 1) ? 's' : '')} ago`;
        else if (days >= 1)
            message = `${days} day${((days > 1) ? 's' : '')} ago`;
        else if (hours >= 1)
            message = `${hours} hour${((hours > 1) ? 's' : '')} ago`;
        else if (minutes >= 1)
            message = `${minutes} minute${((minutes > 1) ? 's' : '')} ago`;
        else
            message = `seconds ago`;

        return message
    }


    return (
        <div className="poll-card" style={{
            backgroundImage: `linear-gradient(
            0deg, rgba(0, 0, 0, 0.55) 10%, rgba(0, 0, 0, 0) 66%), url(${picture})`
        }}>
            {/* 
            <div className="description">{description}</div>
            <div className="category">{category}</div>
            
            <div className="lastUpdated">{lastUpdated}</div>
            <div className="votes">{votes.positive}</div>
            <div className="votes">{votes.negative}</div>  */}
            <div className="picture">
                <div className="picture-inner" style={{
                    backgroundImage: `linear-gradient(90deg, #929292 0%, #929292 22%, rgb(87 87 87) 50%, rgb(139 139 139) 100%)`
                }}>
                {/* <div className="picture-inner" > */}
                    <div className="picture-inner-inner" style={{
                        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0) 40%, #929292 99%), url(${picture})`
                    }}></div>
                    {/* <img src={`${process.env.PUBLIC_URL}/people/${picture}`} alt="" /> */}
                </div>
            </div>
            <div className="main-content">
                <div className="first-section">
                    <div className={`thumbs-indicator ${(isPos) ? 'positive' : 'negative'}`}><img src={(isPos) ? thumbsup : thumbsdown} alt="thumbs up" /></div>
                    <div className="metadata">
                        <div className="name">{
                            name.length > nameLimit ? `${name.substring(0, nameLimit).substring(0, name.substring(0, nameLimit).lastIndexOf(" "))}...` : name
                        }</div>
                        <div className="description">{
                            description.length > descLimit ? `${description.substring(0, descLimit).substring(0, description.substring(0, descLimit).lastIndexOf(" "))}...` : description
                        }</div>
                    </div>
                </div>
                <div className="second-section">
                    <div className="eyebrow">{eyebrow}</div>
                    <div className="voting-section">
                        <div className={`vote-button revert ${(voted) ? 'active' : ''}`} onClick={() => revert()}><img src={undo} alt="thumbs up" /></div>
                        <div className={`vote-button positive ${(thisVote == 1) ? 'active' : ''}`} onClick={() => setThisVote(1)}><img src={thumbsup} alt="thumbs up" /></div>
                        <div className={`vote-button negative ${(thisVote == -1) ? 'active' : ''}`} onClick={() => setThisVote(-1)}><img src={thumbsdown} alt="thumbs down" /></div>
                        <div className={`vote-cta ${(thisVote == 0 && !voted) ? 'disabled' : ''}`} onClick={() => vote()}>{voteCTA}</div>
                    </div>
                </div>
            </div>
            {/* <div className="picture"><img src={cardImage} style={{width: '40px'}} alt="" /></div> */}
            <div className="gauge-bar">
                <div className="progress-bar positive" style={{ width: positiveString }}><img src={thumbsup} alt="thumbs up" />{positiveString} <span className="totalVotes">{positives} vote{(positives > 1) ? 's' : ''}</span></div>
                <div className="progress-bar negative" style={{ width: negativeString }}><img src={thumbsdown} alt="thumbs up" />{negativeString}<span className="totalVotes">{negatives} vote{(negatives > 1) ? 's' : ''}</span></div>
            </div>
        </div>
    )
}
