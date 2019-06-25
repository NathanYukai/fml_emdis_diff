export function parse_fml_emdis(raw_string){
    var splitBySpaces =  raw_string.split(/(\s+)/).filter( e => e.trim().length > 0);
    if(splitBySpaces < 4){
        return {};
    }
    // e.g. DONOR_CB
    var message_type = splitBySpaces[0];
    // /FIELD
    var field_declare = splitBySpaces[1];

    var fields = [];
    var values = [];
    var idx = 2;
    while(true){
        var current = splitBySpaces[idx];
        if(current[0] === '"'){
            break;
        }
        fields.push(current);
        idx ++;
        if(idx >= splitBySpaces.length){
            console.log("invalid fml");
            return {};
        }
    }

    while(idx < splitBySpaces.length){
        var current = splitBySpaces[idx];
        if(current[0] !== '"'
           || current[current.length-1] !== '"'){
            console.log("invalid fml");
            return {};
        }
        values.push(current);
        idx++;
    }

    console.log(fields);
    console.log(values);
    var result = {};
    for (var i = 0; i< fields.length; i++){
        result[fields[i]] = values[i];
    }
    console.log(result);
    return result;
}

export function displayDiff(emdisDiff){
    var result = Object.keys(emdisDiff).reduce((accu, k) => accu += (`${k}: ${emdisDiff[k]} \n`), "");
    return result;
}


