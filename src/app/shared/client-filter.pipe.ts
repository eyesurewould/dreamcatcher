import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
    {
        name: 'clientFilter'
    }
)

export class ClientFilterPipe implements PipeTransform {

    transform(items: any [], criteria: string ): any {
        if(criteria === 'all') { 
            return items 
        } else {
            return items.filter(item => {
//TODO: Figure out how to make this a text search
                return item.category === criteria;
            });
        }
    }
}