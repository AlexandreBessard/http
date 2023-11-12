import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{

  // Invoke this method whenever the request leave the application
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // all properties are immutable
    // get the headers infos, append a new values to the existing one and clone this immutable request
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')})
    /*
    Control here the logic of interceptor
     */
    console.log('Request is on its way');
    // lets the request leave the app
    return next.handle(modifiedRequest);/*.pipe(
      // look into the response
      tap(event => {
        // interact with the Response
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log("Response arrived, body data: ");
          console.log(event.body);
        }
      }));*/
  }


}
