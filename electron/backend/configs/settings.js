const getDefaultSettings = () => {
    const profile = 'default';

    const settings = {
        studentListPaginationLimit: 14,
        courseListPaginationLimit: 10,
        studentListCourseDetailsPaginationLimit: 8,
    }

    const data = Object.keys(settings).map(key => {
        return {
            id: `${profile}-${key}`,
            profile,
            key,
            value: settings[key],
        }
    })

    return data;

}

module.exports = {
    getDefaultSettings
}
