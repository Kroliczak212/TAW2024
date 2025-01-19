import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Pobierz token z localStorage

  if (token) {
    // Klonowanie żądania z dodanym nagłówkiem
    const authReq = req.clone({
      setHeaders: {
        'x-auth-token': `Bearer ${token}`
      }
    });
    return next(authReq); // Prześlij zmodyfikowane żądanie
  } else {
    return next(req); // Prześlij oryginalne żądanie, jeśli token nie istnieje
  }
};
