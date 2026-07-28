import type { Schema, Struct } from '@strapi/strapi';

export interface BussineOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_bussine_opening_hours';
  info: {
    displayName: 'opening_hours';
    icon: 'clock';
  };
  attributes: {
    closes: Schema.Attribute.Time;
    dayOfWeek: Schema.Attribute.Enumeration<
      [
        'Monday ',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday ',
        'Sunday ',
      ]
    >;
    opens: Schema.Attribute.Time;
  };
}

export interface BussineScheduleItem extends Struct.ComponentSchema {
  collectionName: 'components_bussine_schedule_items';
  info: {
    displayName: 'schedule_item';
    icon: 'calendar';
  };
  attributes: {
    day: Schema.Attribute.String & Schema.Attribute.Required;
    hours: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_variants';
  info: {
    displayName: 'variant';
    icon: 'oneToMany';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'bussine.opening-hours': BussineOpeningHours;
      'bussine.schedule-item': BussineScheduleItem;
      'product.variant': ProductVariant;
    }
  }
}
