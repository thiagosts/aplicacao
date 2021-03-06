import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOpportunities } from 'app/shared/model/opportunities.model';

type EntityResponseType = HttpResponse<IOpportunities>;
type EntityArrayResponseType = HttpResponse<IOpportunities[]>;

@Injectable({ providedIn: 'root' })
export class OpportunitiesService {
    public resourceUrl = SERVER_API_URL + 'api/opportunities';

    constructor(private http: HttpClient) {}

    create(opportunities: IOpportunities): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(opportunities);
        return this.http
            .post<IOpportunities>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(opportunities: IOpportunities): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(opportunities);
        return this.http
            .put<IOpportunities>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOpportunities>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOpportunities[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(opportunities: IOpportunities): IOpportunities {
        const copy: IOpportunities = Object.assign({}, opportunities, {
            startDate: opportunities.startDate != null && opportunities.startDate.isValid() ? opportunities.startDate.toJSON() : null,
            endDate: opportunities.endDate != null && opportunities.endDate.isValid() ? opportunities.endDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((opportunities: IOpportunities) => {
                opportunities.startDate = opportunities.startDate != null ? moment(opportunities.startDate) : null;
                opportunities.endDate = opportunities.endDate != null ? moment(opportunities.endDate) : null;
            });
        }
        return res;
    }
}
