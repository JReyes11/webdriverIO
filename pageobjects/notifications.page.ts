class notificationsPage{
    public get list() {
        return $('[data-test=notifications-list]')
    }
}
export default new notificationsPage()