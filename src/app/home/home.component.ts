import { Component, OnInit } from '@angular/core';
import { DishService } from "../services/dish.service";
import { PromotionService } from "../services/promotion.service";
import { Dish } from "../../shared/dish";
import { Promotion } from "../../shared/promotion";
import { LeaderService } from "../services/leader.service";
import { Leader } from "../../shared/leader";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe((d) => this.dish = d);
    this.promotionService.getFeaturedPromotion()
      .subscribe((p) => this.promotion = p);
    this.leaderService.getFeaturedLeader()
      .subscribe((l) => this.leader = l);
  }

}
