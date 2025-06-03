function format_date(dateStr){
    if (!dateStr) return null;

    const part = dateStr.split(/[-\/]/);
    if (part.length !== 3) return null;

    const [dia, mes, ano] = part;
    const date = new Date(`${ano}-${mes}-${dia}`);

    return isNaN(date.getTime()) ? null : date;
}

module.exports = {format_date};