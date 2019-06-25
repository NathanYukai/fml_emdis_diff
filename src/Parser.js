// TODO: this currently assumes that the fields name are all unique, should check that later
export function parse_fml_emdis(raw_string){
    var splitBySpaces =  raw_string.split(/(\s+)/).filter( e => e.trim().length > 0);
    if(splitBySpaces.length < 4){
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

    var result = {};
    for (var i = 0; i< fields.length; i++){
        result[fields[i]] = values[i];
    }
    return result;
}

export function compareEmdis(left, right){
    var reducer = (accu, k) => {
        if(left[k] !== right[k]){
            accu[k] = `left: ${left[k]}, right: ${right[k]}`;
        }
        return accu;
    };
    var fieldsDiff = Object.keys(left).reduce(reducer, {});

    fieldsDiff = Object.keys(right).reduce(reducer, fieldsDiff);
    return fieldsDiff;
}

export function displayDiff(emdisDiff){
    var result = Object.keys(emdisDiff).reduce((accu, k) => accu += (`${k}: ${emdisDiff[k]} \n`), "");
    return result;
}


