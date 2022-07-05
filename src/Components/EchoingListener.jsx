import React from 'react'
import { useEffect, useState } from 'react'
import './EchoingListener.css'

function EchoingListener() {
    const [receivedEvents, setReceivedEvents] = useState([])

    useEffect(() => {
        const streamListener = new EventSource('http://localhost:3001/stream')
        streamListener.onmessage = (event) => {
            console.log(`Received: ${event.data}`)
            setReceivedEvents((prev) => [...prev, event])
        }
        return () => {
            console.log('Closing connection')
            streamListener.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="EchoingListener">
            {receivedEvents.length ? (
                <div>
                    <div className="EchoingListener__LatestEvent">
                    {receivedEvents[receivedEvents.length - 1].lastEventId}: {receivedEvents[receivedEvents.length - 1].data}
                    </div>
                    <div className="EchoingListener__History">
                    History:
                    {receivedEvents.map((event) => (
                        <div key={event.lastEventId}>
                            ID: {event.lastEventId}, Data: {event.data}
                        </div>
                    ))}
                    </div>
                </div>
            ) : undefined}
        </div>
    )
}

export default EchoingListener
