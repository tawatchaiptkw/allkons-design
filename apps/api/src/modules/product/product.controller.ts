import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
    ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post()
    async create(@Request() req, @Body(ValidationPipe) dto: CreateProductDto) {
        return this.productService.create(req.user.id, dto);
    }

    @Get()
    async findAll(@Request() req, @Query('shopId') shopId: string) {
        return this.productService.findAll(req.user.id, shopId);
    }

    @Get(':id')
    async findOne(@Request() req, @Param('id') id: string) {
        return this.productService.findOne(req.user.id, id);
    }

    @Put(':id')
    async update(
        @Request() req,
        @Param('id') id: string,
        @Body(ValidationPipe) dto: UpdateProductDto,
    ) {
        return this.productService.update(req.user.id, id, dto);
    }

    @Delete(':id')
    async remove(@Request() req, @Param('id') id: string) {
        await this.productService.remove(req.user.id, id);
        return { message: 'Product deleted successfully' };
    }
}
