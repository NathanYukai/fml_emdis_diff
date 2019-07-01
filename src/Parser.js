// TODO: this currently assumes that the fields name are all unique, should check that later
export function parse_fml_emdis(raw_string) {
    var firstColumnIdx = raw_string.indexOf(':');
    if (firstColumnIdx < 0) {
        console.warn("invalid fml: can't find column that separate fields and values");
        return [];
    }
    var fields_raw = raw_string.substring(0, firstColumnIdx);
    var values_raw = raw_string.substring(firstColumnIdx + 1);

    //separated by (comma and/or space)+
    var beforeColumn = fields_raw.split(/(?:,|\s)+/).filter(emptyStringFilter);

    if (beforeColumn.length < 3) {
        console.warn("too short");
        return [];
    }

    // e.g. DONOR_CB
    var message_type = beforeColumn[0];
    // /FIELD
    var field_declare = beforeColumn[1];
    var fields = beforeColumn.slice(2);

    var values_group = values_raw.split(/(?:;)/).filter(emptyStringFilter);
    var emdis_messages = [];
    values_group.forEach(element => {
        var emdis = get_emdis_message(fields, element);
        emdis_messages.push(emdis);
    });

    return emdis_messages;
}

//fields: ["FIELD_1"]
//values_raw: "raw string"
function get_emdis_message(fields, values_raw) {
    var values = values_raw.split(/(?:,|\s|")+/).filter(emptyStringFilter);
    if (values.length > fields.length) {
        console.warn(`too many values: fields: ${fields}, values: ${values}`);
    }
    var emdis = {};
    for (var i = 0; i < fields.length; i++) {
        emdis[fields[i]] = values[i];
    }
    return emdis;
}

// return [{left:string, right: string}]
function compareEmdis(emdisOne, emdisTwo) {
    var reducer = (accu, k) => {
        if (emdisOne[k] !== emdisTwo[k]) {
            accu[k] = { left: emdisOne[k], right: emdisTwo[k] };
        }
        return accu;
    };
    var fieldsDiff = Object.keys(emdisOne).reduce(reducer, {});

    fieldsDiff = Object.keys(emdisTwo).reduce(reducer, fieldsDiff);
    return fieldsDiff;
}

export function compareListOfEmdis(listOne, listTwo) {
    var result = [];
    var maxLength = Math.max(listOne.length, listTwo.length);
    var defaultIfUndefined = (obj) => obj === undefined ? {} : obj;
    for (var i = 0; i < maxLength; i++) {
        result.push(compareEmdis(defaultIfUndefined(listOne[i]), defaultIfUndefined(listTwo[i])));
    }
    return result;
}

export function displayListOfDiffs(listDiffs) {
    var result = "";
    listDiffs.forEach((element,idx) => {
        result += `message ${idx} :\n`;
        result += displayDiff(element);
        result += "----------------------\n";
    });
    return result;
}

// accept : [{left:string, right: string}]
function displayDiff(emdisDiff) {
    var result = Object.keys(emdisDiff).reduce((accu, k) => accu += showEmdisDiff(k, emdisDiff), "");
    return result;
}

function showEmdisDiff(key, diff) {
    var msg = `left: ${diff[key].left}`.padEnd(25, ' ').concat(` \t right: ${diff[key].right} \n`);
    return (`${key}:`.padEnd(15).concat(msg));
};

function emptyStringFilter(s) {
    return s.trim().length > 0;
}