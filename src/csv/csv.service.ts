import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';
import { parse } from 'papaparse';

@Injectable()
export class CsvService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async readCSV(file: Express.Multer.File) {
        const stream = Readable.from(file.buffer)
        const csvData = parse(stream, {
            header: false,
            worker: true,
            delimiter: ",",
            step: function (row){
                console.log("Row: ", row.data);
            }
        })
        return csvData
    }
}
