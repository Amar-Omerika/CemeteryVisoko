export const convertCompassToDegrees=(compassData)=>{
    switch(compassData){
        case 'E':return 0
        case 'ENE':return 22
        case 'NE':return 45
        case 'NNE':return 67
        case 'N':return 90
        case 'NNW':return 113
        case 'NW':return 135
        case 'WNW':return 157
        case 'W':return 180
        case 'WSW':return 202
        case 'SW':return 225
        case 'SSW':return 247
        case 'S':return 270
        case 'SSE':return 292
        case 'SE':return 315
        case 'ESE':return 337
        default:return 0
    }
}