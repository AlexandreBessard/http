import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // log before sending the request
    console.log('Outgoing request');
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req)
      .pipe(
        // log the response
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log("Incoming response");
            console.log(req.body);
          }
        }));
  }


}
