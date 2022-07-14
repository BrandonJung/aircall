import React from 'react';

import '../css/call-list.css'

const CallList = (props) => {
    const callList = props.callList;
    const updateCall = props.updateCall;
    const setSelectedCall = props.setSelectedCall;
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

    const renderCallListItem = (callList) => {
        return <div style={{display: 'flex', flexDirection: 'column'}} key={callList.id}>
            <div className='call-list-item-container' onClick={() => {
                setSelectedCall(callList);
                setSelectedPage('CallDetails')
                }
            }>
                <div className='call-list-item'>
                    <div className='call-left-information'>
                        {renderSVG(callList.direction)}
                        {renderCallType(callList.call_type)}
                    </div>
                    <div className='call-middle-information'>
                        <div className='call-number'>
                            {callList.direction === 'outbound' ? callList.to :
                            callList.from}
                        </div>
                        <div className='call-via'>
                            using {callList.via}
                        </div>
                    </div>
                    <div className='call-right-information'>
                        <div className='call-date'>
                            {formatDate(callList.created_at)}
                        </div>
                        <div className='call-time'>
                            {formatTime(callList.created_at)}
                        </div>
                    </div>
                </div>
            </div>
            {callList.showDetails ? <div className='call-list-details-container'>
            <div className='call-list-item'>
                    <div className='call-left-information' style={{marginLeft: '5px', flex: 2}}>
                        Id: {callList.id}
                    </div>
                    <div className='call-middle-information' style={{flex: 6}}>
                        <div className='call-number'>
                            {callList.direction === 'outbound' ? 'From: ' + (callList.from ? callList.from : 'Unknown') :
                            'To: ' + (callList.to ? callList.to : 'Unknown')}
                        </div>
                    </div>
                    <div className='call-right-information' style={{alignItems: 'flex-end', flex: 2, cursor: 'pointer'}} onClick={() => updateCall(callList.id, !callList.is_archived)}>
                        <div style={{marginRight: '10px', display: 'flex', justifyContent: 'center', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(106, 103, 124, 0.2)', padding: '4px'}}>
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="16.000000pt" height="16.000000pt" viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#000000" stroke="none">
                                <path d="M430 4648 c-43 -12 -78 -43 -96 -85 -20 -47 -20 -999 0 -1046 29 -70
                                89 -97 214 -97 l72 0 0 -1392 c0 -974 3 -1405 11 -1433 13 -48 43 -83 86 -101
                                48 -21 3638 -21 3686 0 43 18 73 53 86 101 8 28 11 459 11 1433 l0 1392 73 0
                                c86 0 144 14 176 43 51 46 51 51 51 574 0 472 -1 488 -21 529 -12 26 -36 53
                                -57 66 l-37 23 -2110 2 c-1376 1 -2122 -2 -2145 -9z m4050 -608 l0 -300 -1920
                                0 -1920 0 0 300 0 300 1920 0 1920 0 0 -300z m-302 -1937 l-3 -1318 -1615 0
                                -1615 0 -3 1318 -2 1317 1620 0 1620 0 -2 -1317z"/>
                                <path d="M1842 2700 c-33 -15 -47 -29 -62 -62 -40 -88 -12 -184 62 -218 41
                                -19 71 -20 718 -20 647 0 677 1 718 20 108 49 108 231 0 280 -41 19 -71 20
                                -718 20 -647 0 -677 -1 -718 -20z"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    }

    return (
        <div className='call-list-container'>
            {callList.map((call, index) => {
                return renderCallListItem(call);
            })}
        </div>
    )
};

export default CallList;