class Api {
  execute = (action: string, params: string) => {
    switch (action) {
      case 'link':
        this.goToLink(params)
        break
      case 'alert':
        alert(params)
        break
      case '':
        break
      default:
        console.error('Unknown action')
    }
  }

  goToLink = (href: string) => {
    window.location.href = href
  }
}

export default Api
