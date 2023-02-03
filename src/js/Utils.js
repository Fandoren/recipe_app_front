const TruncateString = (string, maxSize) => {
    if(string !== null) {
        return string.length > maxSize 
            ? string.substring(0, maxSize - 3) + "..." 
            : string;
    }
    return "Пусто"
};

const isEmpty = (field) => {
    return field 
            ? field
            : "Нет данных"
};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    }
);

exports.TruncateString = TruncateString;
exports.toBase64 = toBase64;
exports.isEmpty = isEmpty;