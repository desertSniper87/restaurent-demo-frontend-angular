import { Injectable } from '@angular/core';
import { Dish } from "../../shared/dish";
import { DISHES } from "../../shared/dishes";
import { LEADERS } from "../../shared/leaders";
import { Leader } from "../../shared/leader";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string): Leader {
    return LEADERS.filter((l) => (l.id === id))[0];
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter((l) => (l.featured))[0];
  }

}
