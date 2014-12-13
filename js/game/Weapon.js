var Weapon = Base.extend({
	constructor: function(damage, attackSpeed, reach, sanityThreshold, cooldown, typeAttack, sprites){

		this.damage = damage;
		this.attackSpeed = attackSpeed;
		this.reach = reach;
		this.sanityThreshold = sanityThreshold;
		this.cooldown = cooldown;
		this.typeAttack = typeAttack;
		this.sprites = sprites;
	},
	
	doDamage: function(npc){
		//console.log(npc);
		npc.hp -= this.damage;
	}
});