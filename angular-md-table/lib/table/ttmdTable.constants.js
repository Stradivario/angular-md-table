export default (ngModule) => {
    ngModule.value('TableConstant', {
        limits: {
            mobile: 'mobile',
            desktop: 'desktop'
        }
    })
}
