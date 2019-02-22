import history from '../ui/History';

const unauthentificatedPages = ['/', '/signup', '/login'];
const authentificatedPages = ['/dashboard']

export const onAuthentificationChange = (isAuthentificated) => {
    const pathname = history.location.pathname;
    const isUnAuthentificatedPage = unauthentificatedPages.includes(pathname)
    const isAuthentificatedPage = authentificatedPages.includes(pathname);
    console.log('isAuthentificated', isAuthentificated);
    console.log(pathname);
    
    if(isUnAuthentificatedPage && isAuthentificated){
        history.replace("/dashboard");
    }

    if(isAuthentificatedPage && !isAuthentificated){
        history.replace("/login");
    };
};



 