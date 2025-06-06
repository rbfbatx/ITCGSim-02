export enum GemType {
  EMERALD = 'Emerald',
  SAPPHIRE = 'Sapphire',
  AMETHYST = 'Amethyst',
  RUBY = 'Ruby',
  TOPAZ = 'Topaz',
}

export enum ImaginariumCondition {
  WOUNDED,
  DISABLED,
}

export enum PowerKind {
  PASSIVE,
  CONDITIONAL,
  TRIGGERED,
}

export interface GemEffectiveness {
  strongAgainst: GemType[];
  weakAgainst: GemType[];
}

export const GEM_EFFECTIVENESS: Record<GemType, GemEffectiveness> = {
  [GemType.EMERALD]: { strongAgainst: [GemType.RUBY], weakAgainst: [GemType.SAPPHIRE] },
  [GemType.SAPPHIRE]: { strongAgainst: [GemType.EMERALD], weakAgainst: [GemType.RUBY] },
  [GemType.AMETHYST]: { strongAgainst: [], weakAgainst: [] },
  [GemType.RUBY]: { strongAgainst: [GemType.SAPPHIRE], weakAgainst: [GemType.EMERALD] },
  [GemType.TOPAZ]: { strongAgainst: [], weakAgainst: [] },
};
