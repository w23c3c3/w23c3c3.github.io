const gitalk = new Gitalk({
    clientID: 'd80c9343cb35e3028464',
    clientSecret: '1aabc9852cc2a2ad19e4e1f84a4562fc1f9ae16c',
    repo: 'w23c3c3.github.io',
    owner: 'w23c3c3',
    admin: ['w23c3c3'],
    id: location.pathname,
    distractionFreeMode: false
})
gitalk.render('gitalk-container')