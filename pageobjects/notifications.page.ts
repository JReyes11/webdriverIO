class notificationsPage{
    public get list(): ChainablePromiseElement  {
        return $('[data-test=notifications-list]')
    }
}
export default new notificationsPage()