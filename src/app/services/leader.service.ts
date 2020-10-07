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

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((l) => (l.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((l) => (l.featured))[0]);
  }

}
