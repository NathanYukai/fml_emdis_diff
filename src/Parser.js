// TODO: this currently assumes that the fields name are all unique, should check that later
export function parse_fml_emdis(raw_string){
    var firstColumnIdx = raw_string.indexOf(':');
    if(firstColumnIdx<0){
        console.log("invalid fml: no column separation");
        return {};
    }
    var fields_raw = raw_string.substring(0, firstColumnIdx);
    var values_raw = raw_string.substring(firstColumnIdx+1);

    //separated by (comma and/or space)+
    var beforeColumn = fields_raw.split(/(?:,|\s)+/).filter(e => e.trim().length > 0);

    if(beforeColumn.length < 3){
        console.log("too short");
        return {};
    }

    // e.g. DONOR_CB
    var message_type = beforeColumn[0];
    // /FIELD
    var field_declare = beforeColumn[1];

    var fields = beforeColumn.slice(2);
    var values = values_raw.split(/(?:,|\s|"|;)+/).filter(e => e.trim().length>0);
    // console.log(fields);
    // console.log(values);

    var result = {};
    for (var i = 0; i< fields.length; i++){
        result[fields[i]] = values[i];
    }
    return result;
}

// return [{left:string, right: string}]
export function compareEmdis(left, right){
    var reducer = (accu, k) => {
        if(left[k] !== right[k]){
            accu[k] = {left: left[k], right: right[k]};
        }
        return accu;
    };
    var fieldsDiff = Object.keys(left).reduce(reducer, {});

    fieldsDiff = Object.keys(right).reduce(reducer, fieldsDiff);
    return fieldsDiff;
}

// accept : [{left:string, right: string}]
export function displayDiff(emdisDiff){
    var _showDiff = (key, diff) => {
        var msg = `left: ${diff[key].left}`.padEnd(25, ' ').concat(` \t right: ${diff[key].right} \n`);
        return (`${key}:`.padEnd(10).concat(msg));
    };
    var result = Object.keys(emdisDiff).reduce((accu, k) => accu += _showDiff(k, emdisDiff), "");
    return result;
}


