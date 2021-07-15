import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { RestService } from "./rest.service";

describe('RestService', () => {
    let service: RestService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [RestService]
        });
        service = TestBed.get(RestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
