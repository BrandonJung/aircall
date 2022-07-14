import React from 'react';

import '../css/call-details.css';

const CallDetails = (props) => {
    const call = props.selectedCall;
    const updateCall = props.updateCall;
    const setSelectedPage = props.setSelectedPage;
    
    const formatDate = (date) => {
        const splitString = date.split('-');
        const year = splitString[0];
        const month = splitString[1];
        const day = splitString[2].split('T')[0];
        return month + ' / ' + day + ' / ' + year;
    }

    const formatTime = (date) => {
        const splitString = date.split('T');
        const timeString = splitString[1].split(':');
        const dateMinute = parseInt(timeString[1]);
        const dateHour = parseInt(timeString[0]);
        const dateTimeInDay = (dateHour / 12) < 1 ? 'am' : 'pm';
        return dateHour % 12 + ':' + dateMinute + ' ' + dateTimeInDay;
    }

    const formatDuration = (duration) => {
        if (duration < 60) {
            return duration + 's'
        } else if (duration > 3600) {
            const numberOfHours = parseInt(duration / 3600);
            const numberOfSeconds = duration % 3600;
            const numberOfMinutes = parseInt(numberOfSeconds / 60);
            return numberOfHours + 'h' + numberOfMinutes + 'm';
        } else {
            const numberOfMinutes = parseInt(duration / 60);
            return numberOfMinutes + 'm';
        }
    }

    const renderSVG = (callDirection) => {
        switch (callDirection) {
            case 'outbound': {
                return <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="12pt" height="12pt" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M606 4860 c-292 -138 -540 -260 -553 -272 -12 -11 -30 -41 -39 -65
                    -15 -39 -16 -55 -5 -146 57 -468 204 -963 420 -1412 371 -770 969 -1484 1696
                    -2026 669 -498 1414 -812 2187 -920 176 -25 214 -21 268 29 21 19 104 185 281
                    562 251 534 251 534 247 592 -3 45 -10 65 -34 93 -24 29 -455 313 -982 647
                    -66 43 -117 55 -179 43 -33 -6 -70 -39 -268 -235 -126 -126 -243 -234 -260
                    -240 -66 -25 -201 -5 -397 60 -315 105 -591 281 -859 549 -155 155 -218 230
                    -318 379 -154 229 -268 506 -304 737 -23 145 -29 136 238 405 200 202 234 240
                    240 273 16 86 13 93 -326 620 -177 276 -332 513 -343 526 -29 33 -77 51 -133
                    51 -41 -1 -121 -35 -577 -250z"/>
                    <path d="M3927 4399 c-39 -23 -47 -68 -47 -272 l0 -194 -25 -23 c-24 -22 -37
                    -25 -168 -31 -697 -35 -1114 -290 -1252 -765 -31 -106 -31 -126 -2 -158 41
                    -48 72 -44 166 19 95 65 171 102 286 138 158 49 247 59 587 64 174 3 328 3
                    342 -1 14 -3 35 -16 46 -28 19 -20 20 -35 20 -215 0 -224 7 -254 63 -272 18
                    -6 43 -8 53 -5 10 4 251 189 534 411 369 290 519 413 528 434 25 59 8 75 -474
                    453 -248 194 -481 377 -518 405 -68 52 -102 62 -139 40z"/>
                    </g>
               </svg>
            }
            case 'inbound': {
                return <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="12pt" height="12pt" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">
               
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M606 4860 c-292 -138 -540 -260 -553 -272 -12 -11 -30 -41 -39 -65
                    -15 -39 -16 -55 -5 -146 57 -468 204 -963 420 -1412 371 -770 969 -1484 1696
                    -2026 669 -498 1414 -812 2187 -920 176 -25 214 -21 268 29 21 19 104 185 281
                    562 251 534 251 534 247 592 -3 45 -10 65 -34 93 -24 29 -455 313 -982 647
                    -66 43 -117 55 -179 43 -33 -6 -70 -39 -268 -235 -126 -126 -243 -234 -260
                    -240 -66 -25 -201 -5 -397 60 -315 105 -591 281 -859 549 -155 155 -218 230
                    -318 379 -154 229 -268 506 -304 737 -23 145 -29 136 238 405 200 202 234 240
                    240 273 16 86 13 93 -326 620 -177 276 -332 513 -343 526 -29 33 -77 51 -133
                    51 -41 -1 -121 -35 -577 -250z"/>
                    <path d="M3500 4403 c-26 -11 -1028 -802 -1044 -825 -18 -26 -21 -61 -6 -88
                    14 -26 1025 -819 1060 -831 36 -13 87 11 100 47 6 14 10 113 10 219 0 191 0
                    194 24 222 l24 28 324 0 c214 0 352 -5 408 -13 203 -31 378 -96 508 -189 80
                    -57 122 -62 158 -19 32 37 31 78 -6 187 -55 165 -123 275 -240 389 -217 211
                    -545 326 -995 348 -217 11 -205 -5 -205 268 l0 206 -29 29 c-28 28 -57 35 -91
                    22z"/>
                    </g>
                </svg>
            }
        }
    }

    const renderCallType = (callType) => {
        switch (callType) {
            case 'missed': {
                return <div className='missed-call'>
                    Missed
                </div>
            }
            case 'answered': {
                return <div className='answered-call'>
                    Answered
                </div>
            }
            case 'voicemail': {
                return <div className='voicemail-call'>
                    Voicemail
                </div>
            }
        }
    }

    const renderInformationRow = (type, params) => {
        switch (type) {
            case 'detail': {
                const type = params.callType;
                const direction = params.direction;
                return (
                <div className='call-details-information-row-container'>
                    <div>
                        Details:
                    </div>
                    <div className='call-left-information' style={{flex: 0}}>
                        {renderSVG(direction)}
                        {renderCallType(type)}
                    </div>
                </div>
                )
            }
            case 'date': {
                return (
                <div className='call-details-information-row-container'>
                    <div>
                        Date:
                    </div>
                    <div>
                        <div className='call-details-date'>
                            {formatDate(call.created_at)}
                        </div>
                        <div className='call-details-date'>
                            {formatTime(call.created_at)}
                        </div>
                    </div>
                </div>
                )
            }
            case 'duration': {
                return (
                    <div className='call-details-information-row-container'>
                        <div>
                            Duration:
                        </div>
                        <div>
                            {formatDuration(params)}
                        </div>
                    </div>
                )
            }
            case 'via': {
                return (
                    <div className='call-details-information-row-container'>
                        <div>
                            Using:
                        </div>
                        <div>
                            {params}
                        </div>
                    </div>
                )
            }
            case 'archived': {
                console.log('asdf', params)
                return (
                    <div className='call-details-information-row-container'>
                        <div>
                            Archived:
                        </div>
                        <div>
                            {params ? 'True' : 'False'}
                        </div>
                    </div>
                )
            }
            case 'id': {
                return (
                    <div className='call-details-information-row-container'>
                        <div>
                            Id:
                        </div>
                        <div>
                            {params}
                        </div>
                    </div>
                )
            }
            default: {
                return
            }
        }
    } 

    const renderSeparator = () => {
        return (
            <div className='separator'/>
        )
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'column'}} key={call.id}>
            <div className='call-details-container'>
                <div className='call-details-icon'>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="50.000000pt" height="50.000000pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M2380 4625 c-252 -43 -500 -180 -660 -365 -391 -455 -369 -1111 50
                        -1530 418 -418 1076 -440 1527 -52 140 120 268 315 326 493 169 518 -61 1086
                        -541 1337 -220 115 -471 156 -702 117z m303 -316 c429 -66 730 -472 668 -899
                        -84 -571 -719 -871 -1208 -570 -280 172 -430 506 -369 822 84 432 479 713 909
                        647z"/>
                        <path d="M3613 2559 c-23 -11 -51 -35 -61 -52 -51 -85 -37 -140 65 -250 224
                        -244 358 -554 379 -883 9 -131 0 -157 -80 -232 -306 -286 -1206 -420 -1961
                        -291 -327 55 -616 166 -745 285 -84 79 -94 105 -86 232 20 327 154 645 371
                        879 80 88 99 123 92 181 -12 107 -133 176 -225 128 -38 -20 -148 -136 -220
                        -234 -204 -275 -321 -606 -339 -957 -9 -190 25 -289 146 -418 429 -456 1754
                        -611 2670 -311 251 82 434 186 553 313 120 127 154 226 145 416 -22 422 -191
                        822 -471 1114 -100 104 -150 121 -233 80z"/>
                        </g>
                    </svg>
                    <div className='call-details-phone-container' style={{fontSize: '16px', marginTop: '4px'}}>
                        {call.direction === 'outbound' ? call.to :
                        call.from}
                    </div>
                </div>
                <div className='call-details-information-container'>
                    {renderInformationRow('detail', {callType: call.call_type, direction: call.direction})}
                    {renderSeparator()}
                    {renderInformationRow('date', call.created_at)}
                    {renderSeparator()}
                    {renderInformationRow('duration', call.duration)}
                    {renderSeparator()}
                    {renderInformationRow('via', call.via)}
                    {renderSeparator()}
                    {renderInformationRow('archived', call.is_archived)}
                    {renderSeparator()}
                    {renderInformationRow('id', call.id)}
                </div>
            </div>
            <div className='call-details-archive-button' onClick={() => {
                updateCall(call.id, !call.is_archived);
                setSelectedPage('Activity');
            }}>
                {call.is_archived ? 'Unarchive' : 'Archive'}
            </div>
        </div>
    )
};

export default CallDetails;